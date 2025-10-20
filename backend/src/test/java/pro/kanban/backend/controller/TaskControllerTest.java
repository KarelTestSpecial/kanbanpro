package pro.kanban.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import pro.kanban.backend.model.Task;
import pro.kanban.backend.model.User;
import pro.kanban.backend.repository.TaskRepository;
import pro.kanban.backend.repository.UserRepository;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class TaskControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private TaskRepository taskRepository;

    @MockBean
    private UserRepository userRepository;

    @Test
    void whenUnauthenticated_thenShouldReturn401() throws Exception {
        mockMvc.perform(get("/api/tasks"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(username = "testuser")
    void whenAuthenticated_thenShouldReturnUserTasks() throws Exception {
        // --- Setup ---
        User testUser = new User();
        testUser.setId(1L);
        testUser.setUsername("testuser");

        Task task1 = new Task();
        task1.setId(101L);
        task1.setTitle("Task 1");
        task1.setUser(testUser);

        Task task2 = new Task();
        task2.setId(102L);
        task2.setTitle("Task 2");
        task2.setUser(testUser);

        List<Task> userTasks = Arrays.asList(task1, task2);

        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(testUser));
        when(taskRepository.findAllByUserId(1L)).thenReturn(userTasks);

        // --- Act & Assert ---
        mockMvc.perform(get("/api/tasks"))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(userTasks)));
    }
}
