package com.cyblore.service;

import com.cyblore.dto.LoginRequestDto;
import com.cyblore.dto.LoginResponseDto;
import com.cyblore.dto.UserDto;
import com.cyblore.entity.User;
import com.cyblore.exceptions.InvalidUsernamePasswordException;
import com.cyblore.exceptions.PasswordChangeRequiredException;
import com.cyblore.exceptions.UnknownUsernameException;
import com.cyblore.exceptions.UserAccountInactiveException;
import com.cyblore.exceptions.ResourceNotFoundException;
import com.cyblore.exceptions.ApplicationException;
import com.cyblore.repository.UserRepository;
import com.cyblore.util.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import com.cyblore.service.EmailService;
import org.springframework.beans.factory.annotation.Value;
import jakarta.mail.MessagingException;
import com.cyblore.exceptions.InvalidTokenException;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;
    private final EmailService emailService;
    private final String frontendUrl;

    public AuthService(UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil,
            UserDetailsService userDetailsService,
            EmailService emailService,
            @Value("${app.frontend-url}") String frontendUrl) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
        this.emailService = emailService;
        this.frontendUrl = frontendUrl;
    }

    public LoginResponseDto login(LoginRequestDto request) {
        User user = userRepository.findByUsername(request.getUsername());
        if (user == null || !passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new InvalidUsernamePasswordException();
        }
        if (!user.getIsActive()) {
            throw new InvalidUsernamePasswordException("User account is inactive");
        }
        if (user.getPasswordChangeRequired()) {
            throw new InvalidUsernamePasswordException("Password change required");
        }

        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUsername());
        String token = jwtUtil.generateToken(userDetails);
        LoginResponseDto response = new LoginResponseDto(token);
        mapUserToLoginResponse(user, response);
        return response;
    }

    public UserDto getUserByUsername(String username) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UnknownUsernameException("User not found: " + username);
        }
        return UserDto.fromEntity(user);
    }

    @Transactional
    public void changePassword(String username, String oldPassword, String newPassword) {
        User user = userRepository.findByUsername(username);
        if (user == null || !passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new InvalidUsernamePasswordException();
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        user.setPasswordChangeRequired(false);
        user.setPasswordLastChanged(LocalDateTime.now());
        userRepository.save(user);
    }

    @Transactional
    public void resetPassword(String username, String newPassword) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new InvalidUsernamePasswordException();
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        user.setPasswordChangeRequired(true);
        user.setPasswordLastChanged(LocalDateTime.now());
        userRepository.save(user);
    }

    @Transactional
    public void toggleUserStatus(String username) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new InvalidUsernamePasswordException();
        }

        user.setIsActive(!user.getIsActive());
        userRepository.save(user);
    }

    public void initiatePasswordReset(String email) {
        User user = userRepository.findByPrimaryEmail(email);
        if (user == null) {
            throw new ResourceNotFoundException("No account found with this email address");
        }

        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUsername());
        String resetToken = jwtUtil.generateToken(userDetails);

        String resetLink = String.format("%s/reset-password?token=%s", frontendUrl, resetToken);

        try {
            emailService.sendPasswordResetEmail(email, resetLink, user.getFirstname());
        } catch (MessagingException e) {
            throw new ApplicationException("Failed to send reset email");
        }
    }

    @Transactional
    public void updatePasswordWithToken(String token, String newPassword) {
        String username = jwtUtil.extractUsername(token);
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);

        if (!jwtUtil.validateToken(token, userDetails)) {
            throw new InvalidTokenException("Invalid or expired token");
        }

        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new ResourceNotFoundException("User not found");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        user.setPasswordChangeRequired(false);
        user.setPasswordLastChanged(LocalDateTime.now());
        user.setIsActive(true);
        userRepository.save(user);
    }

    private void mapUserToLoginResponse(User user, LoginResponseDto response) {
        response.setId(user.getId());
        response.setUsername(user.getUsername());
        response.setFirstname(user.getFirstname());
        response.setLastname(user.getLastname());
        response.setDesignation(user.getDesignation());
        response.setPrimaryEmail(user.getPrimaryEmail());
        response.setPrimaryPhone(user.getPrimaryPhone());
        response.setSecondaryEmail(user.getSecondaryEmail());
        response.setSecondaryPhone(user.getSecondaryPhone());
        response.setCreatedAt(user.getCreatedAt());
        response.setCreatedBy(user.getCreatedBy());
        response.setIsActive(user.getIsActive());
        response.setPasswordChangeRequired(user.getPasswordChangeRequired());
        response.setPasswordLastChanged(user.getPasswordLastChanged());
        response.setPrivileges(user.getPrivileges().stream()
                .map(p -> p.getId())
                .toList());
    }
}