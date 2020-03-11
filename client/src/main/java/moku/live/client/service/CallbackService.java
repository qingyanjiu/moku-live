package moku.live.client.service;

import moku.live.client.mapper.CallbackMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class CallbackService {

    private static final Logger logger = LoggerFactory.getLogger(CallbackService.class);

    @Autowired
    CallbackMapper callbackMapper;

    //直播间状态(开启中但未直播-0)
    private static final String LIVE_STATUS_STARTED = "0";
    //直播间状态(正在直播-9)
    private static final String LIVE_STATUS_LIVE = "9";

    //进入直播状态
    public void startLive(Map params) {
        try {
            //要匹配的直播间状态(开启中但未直播-0)
            params.put("newStatus", LIVE_STATUS_LIVE);
            params.put("oldStatus", LIVE_STATUS_STARTED);
            callbackMapper.changeLiveStatus(params);
        } catch (Exception e) {
            logger.error("start live failed");
        }
    }


    public void endLive(Map params) {
        try {
            //要匹配的直播间状态(正在直播-9)
            params.put("oldStatus", LIVE_STATUS_LIVE);
            params.put("newStatus", LIVE_STATUS_STARTED);
            callbackMapper.changeLiveStatus(params);
        } catch (Exception e) {
            logger.error("start live failed");
        }
    }
}