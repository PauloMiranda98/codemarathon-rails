# frozen_string_literal: true

require "json"

changed_files = `git diff --name-only origin/main`.split("\n")

file = File.read("./coverage/.resultset.json")

results_json = JSON.parse(file)

File.open("./coverage/code-coverage-results.md", "w") do |f|
  f.write "# Cobertura de teste dos arquivos alterados\n"

  f.write "| Nome do Arquivo  | Linhas válidas  |  Linha cobertas  | Cobertura | Avaliação |\n"
  f.write "|---|---|---|---|---|\n"

  changed_files.each do |file_name|
    absolute_path = File.expand_path(file_name)

    metrics = results_json["RSpec"]["coverage"][absolute_path]
    next if metrics.nil?

    lines = metrics["lines"] || []
    valid_lines = lines.compact

    total_coverage = valid_lines.count { |line| line > 0 }

    if valid_lines.count == 0
      percentage = 100.00
    else
      percentage = ((total_coverage.to_f / valid_lines.count) * 100)
    end

    if percentage.round.to_i == 100
      icon = ":heart:"
    elsif percentage >= 90
      icon = ":heavy_check_mark:"
    else
      icon = ":x:"
    end

    f.write "| #{file_name} | #{valid_lines.count} | #{total_coverage} | #{percentage.round(2)}% | #{icon} |\n"
  end
end
