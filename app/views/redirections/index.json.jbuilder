json.redirections @redirections do |redirection|
  json.id redirection.id
  json.from redirection.from_path
  json.to redirection.to_path
end
