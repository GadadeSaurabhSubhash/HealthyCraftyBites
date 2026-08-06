package com.healthycraftybites.authenticationservice.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "notification-service-HCB")
public interface NotificationFeignClient {

	@PostMapping("/notificationservice/emailnotification/sendotp")
    String sendOtp(@RequestParam("emailId") String emailId,
                   @RequestParam("otp") String otp);

}
