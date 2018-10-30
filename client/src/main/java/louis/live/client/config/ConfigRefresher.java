package louis.live.client.config;

import com.ctrip.framework.apollo.model.ConfigChangeEvent;
import com.ctrip.framework.apollo.spring.annotation.ApolloConfigChangeListener;
import louis.live.client.config.bean.DbConfig;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.context.scope.refresh.RefreshScope;
import org.springframework.stereotype.Component;

@Component
public class ConfigRefresher {
    private static final Logger logger = Logger.getLogger(ConfigRefresher.class);

    @Autowired
    private DbConfig dbConfig;

    @Autowired
    private RefreshScope refreshScope;

    @ApolloConfigChangeListener
    public void onChange(ConfigChangeEvent changeEvent) {
        boolean dbConfigChanged = false;
        for (String changedKey : changeEvent.changedKeys()) {
            if (changedKey.startsWith("spring.datasource")) {
                dbConfigChanged = true;
                break;
            }
        }

        if (dbConfigChanged) {
            logger.info("before refresh dbConfig" + dbConfig.toString());
            refreshScope.refresh("dbConfig");
            logger.info("after refresh dbConfig" + dbConfig.toString());
        }

    }
}