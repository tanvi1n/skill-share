package com.skillshare.skillshare.controller;

import com.skillshare.skillshare.model.Skill;
import com.skillshare.skillshare.repository.SkillRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

    private final SkillRepository repository;

    public SkillController(SkillRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Skill> getAllSkills() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Skill getSkill(@PathVariable Long id) {
        return repository.findById(id).orElse(null);
    }

    @PostMapping
    public Skill addSkill(@RequestBody Skill skill) {
        return repository.save(skill);
    }

    @PutMapping("/{id}")
    public Skill updateSkill(@PathVariable Long id, @RequestBody Skill skill) {
        skill.setId(id);
        return repository.save(skill);
    }

    @DeleteMapping("/{id}")
    public void deleteSkill(@PathVariable Long id) {
        repository.deleteById(id);
    }
}