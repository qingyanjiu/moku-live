package moku.live.client.mapper;

import moku.live.client.vo.Live;
import moku.live.client.vo.LiveInfo;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface LiveMapper {

    List<LiveInfo> getAll();

    void add(Live live);

//    @Update("update live_info set status='1' where user_id=${userId} and status='0'")
//    void delete(Map params);

    void end(Map params);

    LiveInfo getActiveLiveOfUser(Map params);

    List<LiveInfo> getHistoryLivesOfUser(Map params);

    List<LiveInfo> getLiveByName(Map params);

    void updateLiveName(Map params);

    void updateLivePassword(Map params);

}
