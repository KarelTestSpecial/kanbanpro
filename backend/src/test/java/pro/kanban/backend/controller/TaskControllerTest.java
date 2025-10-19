package pro.kanban.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import pro.kanban.backend.model.Task;
import pro.kanban.backend.model.User;
import pro.kanban.backend.repository.TaskRepository;
import pro.kanban.backend.repository.UserRepository;
import pro.kanban.backend.security.JwtUtil;
import pro.kanban.backend.security.SecurityConfig;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(TaskController.class)
@Import(SecurityConfig.class) // Import security config to apply real security rules
class TaskControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private TaskRepository taskRepository;

    @MockBean
    private UserRepository userRepository;

    // SecurityConfig depends on JwtUtil, so it must be mocked in a WebMvcTest context
    @MockBean
    private JwtUtil jwtUtil;

    @Test
    void whenUnauthenticated_thenShouldReturn401() throws Exception {
        // Voer een GET request uit naar /api/tasks zonder authenticatie
        mockMvc.perform(get("/api/tasks"))
                .andExpect(status().isUnauthorized()); // Verwacht 401 Unauthorized
    }

    @Test
    @WithMockUser(username = "testuser") // Simuleer een ingelogde gebruiker
    void whenAuthenticated_thenShouldReturnUserTasks() throws Exception {
        // --- Setup ---
        // 1. Maak een dummy gebruiker aan
        User testUser = new User();
        testUser.setId(1L);
        testUser.setUsername("testuser");

        // 2. Maak dummy taken voor de gebruiker
        Task task1 = new Task();
        task1.setId(101L);
        task1.setTitle("Task 1");
        task1.setUser(testUser);

        Task task2 = new Task();
        task2.setId(102L);
        task2.setTitle("Task 2");
        task2.setUser(testUser);

        List<Task> userTasks = Arrays.asList(task1, task2);

        // 3. Mock de repository-methodes
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(testUser));
        when(taskRepository.findAllByUserId(1L)).thenReturn(userTasks);

        // --- Act & Assert ---
        mockMvc.perform(get("/api/tasks"))
                .andExpect(status().isOk()) // Verwacht 200 OK
                // Verifieer dat de response body de lijst met taken als JSON bevat
                .andExpect(content().json(objectMapper.writeValueAsString(userTasks)));
    }
}
