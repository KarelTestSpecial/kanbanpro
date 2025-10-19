package pro.kanban.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pro.kanban.backend.controller.dto.AuthRequest;
import pro.kanban.backend.controller.dto.AuthResponse;
import pro.kanban.backend.model.User;
import pro.kanban.backend.repository.UserRepository;
import pro.kanban.backend.security.JwtUtil;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody AuthRequest authRequest) {
        if (userRepository.findByUsername(authRequest.username()).isPresent()) {
            throw new RuntimeException("User already exists");
        }

        User user = User.builder()
                .username(authRequest.username())
                .password(passwordEncoder.encode(authRequest.password()))
                .build();

        userRepository.save(user);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest authRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.username(), authRequest.password())
        );

        final UserDetails userDetails = new org.springframework.security.core.userdetails.User(
                authRequest.username(),
                "", // Password is not needed for token generation
                new ArrayList<>()
        );

        final String token = jwtUtil.generateToken(userDetails);

        return new AuthResponse(token);
    }
}
