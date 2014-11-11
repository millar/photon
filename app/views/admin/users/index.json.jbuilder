json.array! @users do |user|
  json.(user, :id, :username, :email)
  json.active user.invitation_accepted?
  json.created_at user.invitation_accepted_at
  json.invited_at user.invitation_sent_at

  if user.invited_by
    json.invited_by(user.invited_by, :id, :username, :email)
  else
    json.invited_by nil
  end
end
