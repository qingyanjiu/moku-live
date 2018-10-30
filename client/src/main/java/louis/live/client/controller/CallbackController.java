package louis.live.client.controller;

import louis.live.client.service.CallbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/")
public class CallbackController {

    private static final org.apache.log4j.Logger logger = org.apache.log4j.Logger.getLogger(CallbackController.class);

    @Autowired
    private CallbackService callbackService;

    @RequestMapping("startLive")
    public void startLive(String name, HttpServletResponse response){
        Map params = new HashMap<String, String>();
        params.put("streamCode",name);
        try {
            callbackService.startLive(params);
            response.setStatus(200);
            response.setHeader("Content-Type", "text/html;charset=utf-8");
        } catch (Exception e) {
            logger.error("start live failed");
            try {
                response.getWriter().write("error");
            } catch (IOException e1) {
                e1.printStackTrace();
            }
        }
    }

    @RequestMapping("endLive")
    public void endLive(String name, HttpServletResponse response){
        Map params = new HashMap<String, String>();
        params.put("streamCode",name);
        try {
            callbackService.endLive(params);
            response.setStatus(200);
            response.setHeader("Content-Type", "text/html;charset=utf-8");
        } catch (Exception e) {
            logger.error("end live failed");
            try {
                response.getWriter().write("error");
            } catch (IOException e1) {
                e1.printStackTrace();
            }
        }
    }

}