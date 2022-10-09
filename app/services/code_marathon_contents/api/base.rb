module CodeMarathonContents::Api
  class Base
    def self.host
      host = ENV["CODE_MARATHON_CONTENTS_HOST"]
      raise "ENV 'CODE_MARATHON_CONTENTS_HOST' is not set" if host.blank?

      host
    end
  end
end

