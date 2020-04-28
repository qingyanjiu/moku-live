package moku.live.client.mapper;

import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
public interface CallbackMapper {

    void changeLiveStatus(Map params);
}