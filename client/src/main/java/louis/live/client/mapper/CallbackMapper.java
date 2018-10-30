package louis.live.client.mapper;

import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
public interface CallbackMapper {

    @Update(
            "<script>"+
            "update live_info set status=#{newStatus} where streamcode=#{streamCode} and status=#{oldStatus}"+
            "</script>"
    )
    void changeLiveStatus(Map params);
}