package com.bbek.church_management.Controller;

import com.bbek.church_management.dto.RegisterDTO;
import com.bbek.church_management.dto.ResponseDTO;
import com.bbek.church_management.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public String register(RegisterDTO registerDTO, Model model) {
        ResponseDTO response = authService.registerMember(registerDTO);
        if (response.isSuccess()) {
            model.addAttribute("message", "Registered successfully!");
        } else {
            model.addAttribute("error", "Failed to register.");
        }
        return "admin/member/addMember";
    }
}
