package pro.kanban.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pro.kanban.backend.model.Task;
import pro.kanban.backend.model.User;
import pro.kanban.backend.repository.TaskRepository;
import pro.kanban.backend.repository.UserRepository;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    private User getUserByPrincipal(Principal principal) {
        return userRepository.findByUsername(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found: " + principal.getName()));
    }

    @GetMapping
    public List<Task> getAllTasks(Principal principal) {
        User user = getUserByPrincipal(principal);
        return taskRepository.findAllByUserId(user.getId());
    }

    @PostMapping
    public ResponseEntity<Task> createTask(Principal principal, @RequestBody Task newTask) {
        User user = getUserByPrincipal(principal);
        newTask.setUser(user);
        Task savedTask = taskRepository.save(newTask);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedTask);
    }

    @PutMapping("/{taskId}")
    public Task updateTask(Principal principal, @PathVariable Long taskId, @RequestBody Task updatedTask) {
        User user = getUserByPrincipal(principal);
        Task existingTask = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found: " + taskId));

        if (!existingTask.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("You are not authorized to update this task");
        }

        existingTask.setTitle(updatedTask.getTitle());
        existingTask.setDescription(updatedTask.getDescription());
        existingTask.setStatus(updatedTask.getStatus());

        return taskRepository.save(existingTask);
    }

    @DeleteMapping("/{taskId}")
    public ResponseEntity<Void> deleteTask(Principal principal, @PathVariable Long taskId) {
        User user = getUserByPrincipal(principal);
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found: " + taskId));

        if (!task.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("You are not authorized to delete this task");
        }

        taskRepository.delete(task);
        return ResponseEntity.noContent().build();
    }
}
