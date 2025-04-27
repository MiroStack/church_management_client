package com.bbek.church_management.service;

import com.bbek.church_management.dto.RegisterDTO;
import com.bbek.church_management.dto.ResponseDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;



@Service
public class AuthService {
    @Autowired
    private RestTemplate restTemplate;

    @Value("${api.auth.url}")
    private String authUrl;


    public ResponseDTO registerMember(RegisterDTO registerDTO) {
        try {
            String url = authUrl + "/register";

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<RegisterDTO> entity = new HttpEntity<>(registerDTO, headers);

            ResponseEntity<ResponseDTO> response = restTemplate.exchange(
                    url,
                    HttpMethod.POST,
                    entity,
                    ResponseDTO.class // <-- Expect ResponseDTO, not String
            );

            System.out.println(response.getBody());
            return response.getBody();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }


}
