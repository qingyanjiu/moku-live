package moku.live.client.mapper;

import moku.live.client.vo.User;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface UserMapper {

    List<User> getAll();

    User getOne(String userId);

    User findByName(String username);

    void insert(User user);

    void updateLoginDate(Map params);

    void changeStatus(Map params);

    int checkName(Map params);
}
