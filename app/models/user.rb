class User < ApplicationRecord
    has_many :recipients, foreign_key: "recipient_id", class_name: "Notification"
    has_many :senders, foreign_key: "sender_id", class_name: "Notification"
end
