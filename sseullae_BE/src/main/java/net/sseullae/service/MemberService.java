package net.sseullae.service;

import lombok.RequiredArgsConstructor;
import net.sseullae.dto.RequestMember;
import net.sseullae.entity.Member;
import net.sseullae.repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    private boolean isDuplicateNickname(String nickname) {
        return memberRepository.existsByNickname(nickname);
    }

    @Transactional
    public void join(RequestMember requestMember) {
        if (isDuplicateNickname(requestMember.nickname())) {
            throw new IllegalArgumentException("이미 존재하는 닉네임입니다.");
        }
        memberRepository.save(Member.builder()
                .nickname(requestMember.nickname())
                .build()
        );
    }
}
