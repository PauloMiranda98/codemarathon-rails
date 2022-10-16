module CodeMarathonContents::Api
  class Base
    def self.obtain_file_text(relative_path:)
      file = File.open("#{code_marathon_contents_path}/#{relative_path}", "r")
      file.read
    end

    private

    def self.code_marathon_contents_path
      "#{Rails.root}/engines/code_marathon_contents"
    end
  end
end

