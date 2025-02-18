package com.cyblore.controller;

import com.cyblore.dto.LoginRequestDto;
import com.cyblore.dto.LoginResponseDto;
import com.cyblore.dto.UserDto;
import com.cyblore.dto.ChangePasswordRequestDto;
import com.cyblore.dto.ErrorResponse;
import com.cyblore.dto.PasswordResetRequestDto;
import com.cyblore.dto.SuccessResponse;
import com.cyblore.dto.UpdatePasswordRequestDto;
import com.cyblore.exceptions.UnknownUsernameException;
import com.cyblore.service.CustomUserDetailsService;
import com.cyblore.service.AuthService;
import com.cyblore.util.JwtUtil;
import com.cyblore.exceptions.InvalidUsernamePasswordException;
import com.cyblore.exceptions.UserAccountInactiveException;
import com.cyblore.exceptions.PasswordChangeRequiredException;
import com.cyblore.exceptions.ResourceNotFoundException;
import com.cyblore.exceptions.ApplicationException;
import com.cyblore.exceptions.InvalidTokenException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@CrossOrigin
@RestController
@RequestMapping("/api/auth")
@Slf4j
public class AuthController {

    private final AuthService service;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final JwtUtil jwtUtil;

    public AuthController(AuthService service,
            AuthenticationManager authenticationManager,
            UserDetailsService userDetailsService,
            JwtUtil jwtUtil) {
        this.service = service;
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<?> handleLogin(@RequestBody LoginRequestDto request) {
        log.debug("LoginRequestDto is {}", request);
        try {
            // First authenticate
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

            // If authentication successful, get user details and generate token
            final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());
            final String jwt = jwtUtil.generateToken(userDetails);

            // Get full user details and create response
            LoginResponseDto response = service.login(request);
            response.setToken(jwt);
            return ResponseEntity.ok(response);

        } catch (BadCredentialsException e) {
            return ResponseEntity.status(401)
                    .body(new ErrorResponse("Invalid username or password", "AUTH001"));
        } catch (Exception e) {
            log.error("Login error", e);
            return ResponseEntity.status(500)
                    .body(new ErrorResponse("An error occurred during login", "AUTH002"));
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> handleGetCurrentUser(Principal principal) {
        try {
            UserDto user = service.getUserByUsername(principal.getName());
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            log.error("Error getting current user", e);
            return ResponseEntity.status(500)
                    .body("An error occurred while getting user details");
        }
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> handleChangePassword(@RequestBody ChangePasswordRequestDto request) {
        try {
            final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());

            if (!userDetails.getUsername().equals(request.getUsername())) {
                return ResponseEntity.status(403)
                        .body(new ErrorResponse("Unauthorized: Username mismatch", "AUTH006"));
            }

            service.changePassword(request.getUsername(), request.getOldPassword(), request.getNewPassword());

            var user = service.getUserByUsername(request.getUsername());
            final String jwt = jwtUtil.generateToken(userDetails);

            LoginResponseDto dto = createLoginResponseDto(user, jwt);
            return ResponseEntity.ok(dto);

        } catch (InvalidUsernamePasswordException e) {
            return ResponseEntity.status(400)
                    .body(new ErrorResponse("Current password is incorrect", "AUTH007"));
        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body(new ErrorResponse("An error occurred while changing the password", "AUTH008"));
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> handlePasswordResetRequest(@RequestBody PasswordResetRequestDto request) {
        try {
            service.initiatePasswordReset(request.getEmail());
            return ResponseEntity.ok()
                    .body(new SuccessResponse("Password reset instructions sent to your email"));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404)
                    .body(new ErrorResponse(e.getMessage(), "AUTH009"));
        } catch (ApplicationException e) {
            return ResponseEntity.status(500)
                    .body(new ErrorResponse(e.getMessage(), "AUTH010"));
        }
    }

    @PostMapping("/update-password")
    public ResponseEntity<?> handleUpdatePassword(@RequestBody UpdatePasswordRequestDto request) {
        try {
            service.updatePasswordWithToken(request.getToken(), request.getNewPassword());
            return ResponseEntity.ok()
                    .body(new SuccessResponse("Password updated successfully"));
        } catch (InvalidTokenException e) {
            return ResponseEntity.status(401)
                    .body(new ErrorResponse(e.getMessage(), "AUTH011"));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404)
                    .body(new ErrorResponse(e.getMessage(), "AUTH012"));
        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body(new ErrorResponse("An error occurred while updating password", "AUTH013"));
        }
    }

    private LoginResponseDto createLoginResponseDto(UserDto user, String jwt) {
        LoginResponseDto dto = new LoginResponseDto();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setFirstname(user.getFirstname());
        dto.setLastname(user.getLastname());
        dto.setDesignation(user.getDesignation());
        dto.setPrimaryEmail(user.getPrimaryEmail());
        dto.setPrimaryPhone(user.getPrimaryPhone());
        dto.setSecondaryEmail(user.getSecondaryEmail());
        dto.setSecondaryPhone(user.getSecondaryPhone());
        dto.setCreatedAt(user.getCreatedAt());
        dto.setCreatedBy(user.getCreatedBy());
        dto.setIsActive(user.getIsActive());
        dto.setPasswordChangeRequired(user.getPasswordChangeRequired());
        dto.setPasswordLastChanged(user.getPasswordLastChanged());
        dto.setToken(jwt);
        var privileges = user.getPrivileges().stream().map(p -> p.getId()).toList();
        dto.setPrivileges(privileges);
        return dto;
    }
}