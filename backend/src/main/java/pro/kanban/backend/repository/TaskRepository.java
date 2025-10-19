package pro.kanban.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pro.kanban.backend.model.Task;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findAllByUserId(Long userId);
}
