package com.cyblore.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.time.format.DateTimeFormatter;
import java.time.LocalDateTime;
import java.util.Properties;

@Service
public class EmailService {
    private final JavaMailSender mailSender;
    private final String emailFrom;

    public EmailService(
            @Value("${spring.mail.host}") String host,
            @Value("${spring.mail.port}") int port,
            @Value("${spring.mail.username}") String username,
            @Value("${spring.mail.password}") String password) {

        this.emailFrom = username;
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost(host);
        mailSender.setPort(port);
        mailSender.setUsername(username);
        mailSender.setPassword(password);

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");

        this.mailSender = mailSender;
    }

    public void sendPasswordResetEmail(String toEmail, String resetLink, String username) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setFrom(emailFrom);
        helper.setTo(toEmail);
        helper.setSubject("Password Reset Request - Temple Manager");

        String htmlContent = String.format(
                """
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                            <div style="background-color: #f8f9fa; padding: 20px; text-align: center;">
                                <h1 style="color: #2c3e50;">Temple Manager</h1>
                            </div>
                            <div style="padding: 20px; border: 1px solid #dee2e6; border-radius: 5px; margin-top: 20px;">
                                <p>Dear %s,</p>
                                <p>We received a request to reset your password for your Temple Manager account.</p>
                                <p>Click the button below to reset your password:</p>
                                <div style="text-align: center; margin: 30px 0;">
                                    <a href="%s" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
                                </div>
                                <p>If you didn't request this password reset, please ignore this email.</p>
                                <p>This link will expire in 1 hour for security reasons.</p>
                                <hr style="border-top: 1px solid #dee2e6; margin: 20px 0;">
                                <p style="color: #6c757d; font-size: 0.9em;">This is an automated message, please do not reply.</p>
                            </div>
                            <div style="text-align: center; margin-top: 20px; color: #6c757d; font-size: 0.8em;">
                                <p>&copy; %d Temple Manager. All rights reserved.</p>
                            </div>
                        </div>
                        """,
                username,
                resetLink,
                LocalDateTime.now().getYear());

        helper.setText(htmlContent, true);
        mailSender.send(message);
    }
}