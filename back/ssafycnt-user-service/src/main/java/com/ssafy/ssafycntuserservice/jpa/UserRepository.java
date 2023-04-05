package com.ssafy.ssafycntuserservice.jpa;

import org.h2.engine.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    UserEntity findByUserId(String userId);
    UserEntity findByEmail(String username);

//    Optional<UserEntity> findByEmail(String username);

    @Query("select u from UserEntity u where u.id in (:pIdList)")
    List<String> findByIdList(@Param("pIdList") List<Long> idList);

    Optional<UserEntity> findByUsername(String username);
}
