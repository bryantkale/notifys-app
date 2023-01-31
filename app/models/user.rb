class User < ApplicationRecord
    has_many :recipients, foreign_key: "recipient_id", class_name: "Notification"
    has_many :senders, foreign_key: "sender_id", class_name: "Notification"
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
