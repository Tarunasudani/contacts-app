package com.flock.contactsapp.rowMapper;

import com.flock.contactsapp.response.ContactResponse;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ContactResponseRowMapper implements RowMapper<ContactResponse> {

    @Override
    public ContactResponse mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new ContactResponse(
                rs.getTimestamp("contactId"),
                rs.getString("contactName"),
                rs.getString("phoneNumber"),
                rs.getObject("contactDetails"),
                rs.getInt("score")
        );
    }
}
