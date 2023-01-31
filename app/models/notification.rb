class Notification < ApplicationRecord
    validates :task, presence: true, length: { minimum: 10 }
    belongs_to :recipient, class_name: "User"
    belongs_to :sender, class_name: "User"
end
