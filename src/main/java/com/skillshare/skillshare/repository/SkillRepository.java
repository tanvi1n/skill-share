package com.skillshare.skillshare.repository;

import com.skillshare.skillshare.model.Skill;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SkillRepository extends MongoRepository<Skill, String> {
}