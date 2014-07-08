json.array!(@bio) do |biography|
  json.extract! biography, :id, :person, :title, :content
  json.url biography_url(biography, format: :json)
end
