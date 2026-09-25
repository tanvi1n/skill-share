package com.skillshare.skillshare.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.skillshare.skillshare.model.Skill;

public interface SkillRepository extends JpaRepository<Skill, Long> {

}