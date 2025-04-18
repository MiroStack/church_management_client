package com.bbek.church_management.Controller;


import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {
    @GetMapping("/")
    public String home(HttpServletRequest request, Model model) {
        model.addAttribute("requestURI", request.getRequestURI());
        return "index"; // maps to templates/a.html
    }
    @GetMapping("/about")
    public String about(HttpServletRequest request, Model model) {
        model.addAttribute("requestURI", request.getRequestURI());
        return "about/about"; // maps to templates/a.html
    }
    @GetMapping("/admin")
    public String admin(HttpServletRequest request, Model model) {
        model.addAttribute("requestURI", request.getRequestURI());
        return "admin/admin"; // maps to templates/a.html
    }
    @GetMapping("/contact")
    public String contact(HttpServletRequest request, Model model) {
        model.addAttribute("requestURI", request.getRequestURI());
        return "contact/contact"; // maps to templates/a.html
    }
    @GetMapping("/events")
    public String events(HttpServletRequest request, Model model) {
        model.addAttribute("requestURI", request.getRequestURI());
        return "events/events"; // maps to templates/a.html
    }
    @GetMapping("/member")
    public String member(HttpServletRequest request, Model model) {
        model.addAttribute("requestURI", request.getRequestURI());
        return "member/member"; // maps to templates/a.html
    }
    @GetMapping("/ministries")
    public String ministries(HttpServletRequest request, Model model) {
        model.addAttribute("requestURI", request.getRequestURI());
        return "ministries/ministries"; // maps to templates/a.html
    }
}
