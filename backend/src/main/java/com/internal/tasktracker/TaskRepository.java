package com.internal.tasktracker;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    // Search non-archived tasks by term and optional status filter.
    // Parentheses are important: the status and archived predicates must apply
    // to both title and description matches.
    @Query(value = "SELECT * FROM tasks "
                 + "WHERE archived = FALSE "
                 + "AND (LOWER(title) LIKE :term OR LOWER(description) LIKE :term) "
                 + "AND (:status IS NULL OR status = :status) "
                 + "ORDER BY created_at DESC",
           nativeQuery = true)
    List<Task> searchTasks(@Param("term") String term, @Param("status") String status);
}
