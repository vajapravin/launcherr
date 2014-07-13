json.array!(@posts) do |post|
  json.extract! post, :id, :project_name, :quick_pitch, :full_pitch, :user_id, :youtube_id, :to_the_table, :compensation_method, :location, :tags
  json.url post_url(post, format: :json)
end
