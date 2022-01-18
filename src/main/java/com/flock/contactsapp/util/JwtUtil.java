package com.flock.contactsapp.util;

import com.flock.contactsapp.dao.UserDAO;
import io.jsonwebtoken.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.util.Base64;
import java.util.Date;

public class JwtUtil {

    @Autowired
    UserDAO userDAO;

    public static  String createToken(int userId, String subject, long expirationTime) {
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
        String secret = "ABCKHJBCKJABCSJKBACJKBJABCJKBASCJHBAJCHBAJHCBAJCBJAHSCBJ";
        Key hmacKey = new SecretKeySpec(Base64.getDecoder().decode(secret),
                SignatureAlgorithm.HS256.getJcaName());
        long timeNow = System.currentTimeMillis();
        Date now = new Date(timeNow);
        JwtBuilder builder = Jwts.builder().setId(Integer.toString(userId))
                .setIssuedAt(now)
                .setSubject(subject)
                .setIssuer("ContactsApi")
                .signWith(hmacKey);
        if (expirationTime > 0) {
            long expMillis = timeNow + expirationTime;
            Date exp = new Date(expMillis);
            builder.setExpiration(exp);
        }
        return builder.compact();
    }

    public  Claims parseToken(String jwt) {

        String secret = "ABCKHJBCKJABCSJKBACJKBJABCJKBASCJHBAJCHBAJHCBAJCBJAHSCBJ";
        Key hmacKey = new SecretKeySpec(Base64.getDecoder().decode(secret),
                SignatureAlgorithm.HS256.getJcaName());

        Claims claims = Jwts.parserBuilder()
                .setSigningKey(hmacKey)
                .build()
                .parseClaimsJws(jwt).getBody();

        return claims;
    }

    public boolean verifyToken(String sessionToken) {
        Claims tokenDetails = parseToken(sessionToken);

        if ( userDAO.getUserById(Integer.parseInt(tokenDetails.getId())).size() == 0 )
            return false;
        return true;
    }
}
