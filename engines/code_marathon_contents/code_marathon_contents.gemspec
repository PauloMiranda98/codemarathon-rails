# frozen_string_literal: true

require_relative "lib/code_marathon_contents/version"

Gem::Specification.new do |spec|
  spec.name        = "code_marathon_contents"
  spec.version     = CodeMarathonContents::VERSION
  spec.authors     = ["Paulo Miranda"]
  spec.email       = ["paulomirandamss12@gmail.com"]
  spec.homepage    = "http://codemarathon.com.br"
  spec.summary     = "Handles the contents of the CodeMarathon website"
  spec.description = spec.summary

  spec.files = Dir.chdir(File.expand_path(__dir__)) do
    Dir["{app,config,db,lib}/**/*", "Rakefile", "README.md"]
  end

  spec.add_dependency "rails", ">= 7.0.3.1"
end
