package com.flock.contactsapp.dao;

import com.flock.contactsapp.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.sql.PreparedStatement;
import java.sql.Statement;

@Repository
public class UserDAOImpl implements UserDAO{

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public int addUser(String email, String password) {
        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection
                    .prepareStatement(
                            "INSERT INTO User(email, password) VALUES(?,?);",
                            Statement.RETURN_GENERATED_KEYS
                    );
            ps.setString(1, email);
            ps.setString(2,password);

            return ps;
        }, keyHolder);

        return ((BigInteger) keyHolder.getKey()).intValue();
    }

    @Override
    public User verifyUser(String email, String password) {
        return
                jdbcTemplate.queryForObject(
                        "SELECT * FROM User WHERE email=? AND password=?",
                        new BeanPropertyRowMapper<User>(User.class),
                        email,
                        password
                );
    }
}
