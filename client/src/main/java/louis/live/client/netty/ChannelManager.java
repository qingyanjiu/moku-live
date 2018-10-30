package louis.live.client.netty;

import io.netty.channel.Channel;
import io.netty.handler.codec.http.websocketx.TextWebSocketFrame;

import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.locks.ReentrantReadWriteLock;

public class ChannelManager {
    private static ReentrantReadWriteLock rwLock = new ReentrantReadWriteLock(true);

    private static ConcurrentMap<Channel, ChannelInfo> channelInfos = new ConcurrentHashMap<>();

    public static ChannelInfo getChannelInfo(Channel channel) {
        ChannelInfo channelInfo = channelInfos.get(channel);
        return channelInfo;
    }

    /**
     * 登录注册 channel
     */
    public static void addChannel(Channel channel,String uid) {
        String remoteAddr = channel.remoteAddress().toString();
        ChannelInfo ChannelInfo = new ChannelInfo();
        ChannelInfo.setUserId(uid);
        ChannelInfo.setAddr(remoteAddr);
        ChannelInfo.setChannel(channel);
        channelInfos.put(channel, ChannelInfo);
    }

    /**
     * 登录注册 channel
     */
    public static void removeChannel(Channel channel) {
        channelInfos.remove(channel);
    }

    /**
     * 普通消息
     */
    public static void broadcastMess(String uid,String message,String sender) {
        if (message != null || !"".equals(message)) {
            try {
                rwLock.readLock().lock();
                Set<Channel> keySet = channelInfos.keySet();
                for (Channel ch : keySet) {
                    ChannelInfo ChannelInfo = channelInfos.get(ch);
                    if (!ChannelInfo.getUserId().equals(uid)) continue;
                    String backmessage=sender+","+message;
                    ch.writeAndFlush(new TextWebSocketFrame(backmessage));
                    /*  responseToClient(ch,message);*/
                }
            } finally {
                rwLock.readLock().unlock();
            }
        }
    }
}
