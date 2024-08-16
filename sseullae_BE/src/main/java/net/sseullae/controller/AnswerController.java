package net.sseullae.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import net.sseullae.dto.RequestAnswer;
import net.sseullae.dto.ResponseAnswer;
import net.sseullae.entity.Answer;
import net.sseullae.service.AnswerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/answers")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", allowedHeaders = "*")
public class AnswerController {

    private final AnswerService answerService;

    @PostMapping
    public ResponseEntity<Void> save(@RequestBody RequestAnswer requestAnswer) {
        Answer newAnswer = answerService.save(requestAnswer);
        return ResponseEntity.status(HttpStatus.CREATED)
                .header("Location", "/api/answers/" + newAnswer.getId())
                .build();
    }

    @GetMapping
    public ResponseEntity<List<ResponseAnswer>> getAnswer(@RequestParam Long id, @RequestParam int month) {
        return ResponseEntity.status(HttpStatus.OK).body(answerService.getAnswers(id, month));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteAnswer(@PathVariable Long id) {
        answerService.delete(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
