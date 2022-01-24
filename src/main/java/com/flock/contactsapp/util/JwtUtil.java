package com.flock.contactsapp.util;
import com.flock.contactsapp.dao.UserDAO;
import com.flock.contactsapp.exception.AuthorizationException;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.util.Base64;
import java.util.Date;

@Component
public class JwtUtil {
    private final static String KEY = "ABCKHJBCKJABCSJKBACJKBJABCJKBASCJHBAJCHBAJHCBAJCBJAHSCBJ";
    private final static Key SIGNING_KEY = new SecretKeySpec(Base64.getDecoder().decode(KEY), SignatureAlgorithm.HS256.getJcaName());

    public static String createToken(int userId, String subject, long expirationTime) {
        long currentTimeInMilliSec = System.currentTimeMillis();
        Date tokenIssueAt = new Date(currentTimeInMilliSec);
        long tokenExpiryInMilliSec = currentTimeInMilliSec + expirationTime;
        Date tokenExpireAt = new Date(tokenExpiryInMilliSec);

        JwtBuilder builder = Jwts.builder().setId(Integer.toString(userId))
                .setIssuedAt(tokenIssueAt)
                .setSubject(subject)
                .setIssuer("ContactsApi")
                .signWith(SIGNING_KEY)
                .setExpiration(tokenExpireAt);
        return builder.compact();
    }

    public Integer verifyTokenAndGetUserId(String sessionToken) {
        try {
            Claims tokenDetails = parseToken(sessionToken);
            return Integer.parseInt(tokenDetails.getId());
        } catch (ExpiredJwtException | SignatureException ex) {
            throw new AuthorizationException("Session Token inspired/invalid");
        }
    }

    public Claims parseToken(String jwt) {
        return Jwts.parserBuilder()
                .setSigningKey(SIGNING_KEY)
                .build()
                .parseClaimsJws(jwt).getBody();
    }
}