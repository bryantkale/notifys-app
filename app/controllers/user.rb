class User < ApplicationRecord
    # has_secure_password
    def recieved_notifications
        Notification.where(recipient: self).last(10)
    end

    def sent_notifications
        Notification.where(sender: self).last(10)
    end

    def welcome
        "Hey, #{self.email}!"
    end
end
