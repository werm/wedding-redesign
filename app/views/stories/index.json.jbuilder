json.array!(@stories) do |story|
  json.extract! story, :id, :title, :time, :icon, :content
  json.url story_url(story, format: :json)
end
