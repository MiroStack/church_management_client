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
    @GetMapping("/mission")
    public String mission(HttpServletRequest request, Model model) {
        model.addAttribute("requestURI", request.getRequestURI());
        return "about/mission"; // maps to templates/a.html
    }

    @GetMapping("/vision")
    public String vision(HttpServletRequest request, Model model) {
        model.addAttribute("requestURI", request.getRequestURI());
        return "about/vision"; // maps to templates/a.html
    }
    @GetMapping("/church_leaders")
    public String churchLeaders(HttpServletRequest request, Model model) {
        model.addAttribute("requestURI", request.getRequestURI());
        return "about/church_leaders"; // maps to templates/a.html
    }
    @GetMapping("/department_officers")
    public String departmentOfficers(HttpServletRequest request, Model model) {
        model.addAttribute("requestURI", request.getRequestURI());
        return "about/department_officers"; // maps to templates/a.html
    }
    @GetMapping("/history")
    public String history(HttpServletRequest request, Model model) {
        model.addAttribute("requestURI", request.getRequestURI());
        return "about/history"; // maps to templates/a.html
    }

    @GetMapping("/dashboard")
    public String dashboard(HttpServletRequest request, Model model) {
        model.addAttribute("requestURI", request.getRequestURI());
        model.addAttribute("pageText", "Dashboard");
        return "admin/dashboard/index"; // maps to templates/a.html
    }

    @GetMapping("/memberRecord")
    public String memberRecord(HttpServletRequest request, Model model) {
        model.addAttribute("requestURI", request.getRequestURI());
        model.addAttribute("pageText", "Member Record");
        return "admin/member_record/index"; // maps to templates/a.html
    }

    @GetMapping("/eventsRecord")
    public String eventsRecord(HttpServletRequest request, Model model) {
        model.addAttribute("requestURI", request.getRequestURI());
        model.addAttribute("pageText", "Events");
        return "admin/events/index"; // maps to templates/a.html
    }

    @GetMapping("/tithesAndOffering")
    public String tithesAndOffering(HttpServletRequest request, Model model) {
        model.addAttribute("requestURI", request.getRequestURI());
        model.addAttribute("pageText", "Tithes & Offering");
        return "admin/tithes_and_offering/index"; // maps to templates/a.html
    }

    @GetMapping("/marriageRecord")
    public String marriageRecord(HttpServletRequest request, Model model) {
        model.addAttribute("requestURI", request.getRequestURI());
        model.addAttribute("pageText", "Marriage Record");
        return "admin/marriage_record/index"; // maps to templates/a.html
    }

    @GetMapping("/churchLeadersRecord")
    public String churchLeadersRecord(HttpServletRequest request, Model model) {
        model.addAttribute("requestURI", request.getRequestURI());
        model.addAttribute("pageText", "Church Leaders");
        return "admin/church_leaders/index"; // maps to templates/a.html
    }

    @GetMapping("/departmentOfficersRecord")
    public String departmentOfficersRecord(HttpServletRequest request, Model model) {
        model.addAttribute("requestURI", request.getRequestURI());
        model.addAttribute("pageText", "Department Officers");
        return "admin/department_officers/index"; // maps to templates/a.html
    }

    @GetMapping("/service_request")
    public String service_request_record(HttpServletRequest request, Model model) {
        model.addAttribute("requestURI", request.getRequestURI());
        model.addAttribute("pageText", "Service Request");
        return "admin/service_request/index"; // maps to templates/a.html
    }

    @GetMapping("/dashboardMember")
    public String dashboardMember(HttpServletRequest request, Model model) {
        model.addAttribute("requestURI", request.getRequestURI());
        model.addAttribute("pageText", "Dashboard");
        return "member/dashboard/index"; // maps to templates/a.html
    }



}
