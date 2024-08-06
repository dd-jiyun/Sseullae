package net.sseullae.controller;

import lombok.RequiredArgsConstructor;
import net.sseullae.dto.RequestMember;
import net.sseullae.entity.Member;
import net.sseullae.service.MemberService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/members")
public class MemberController {

    private final MemberService memberService;

    @PostMapping("join")
    public ResponseEntity<Void> join(@RequestBody RequestMember requestMember) {
        Member newMember = memberService.join(requestMember);
        return ResponseEntity.status(HttpStatus.CREATED)
                .header("Location", "/api/members/" + newMember.getId())
                .build();
    }

}
