changed_files = `git diff --name-only origin/main`.split("\n")

puts(changed_files)

File.open("code-coverage-results.md", "w") do |f| 
  f.write "# Primeiro Comentário\n"
  changed_files.each do |file_name|
    f.write "- #{file_name}\n"
  end
end
