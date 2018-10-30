package louis.live.client;

import louis.live.client.mapper.UserMapper;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.HashMap;
import java.util.Map;

@RunWith(SpringRunner.class)
@SpringBootTest
public class LiveclientApplicationTests {

	@Autowired
	UserMapper userMapper;

	@Test
	public void testCheckName() {
		Map params = new HashMap();
		params.put("userName","qingyanjiu");
		int count = userMapper.checkName(params);
		System.out.println(count);
		Assert.assertEquals(count,1);
	}

}
