module CodeMarathonContents
  class Engine < ::Rails::Engine
    isolate_namespace CodeMarathonContents

    config.assets.precompile += ["code_marathon_contents_manifest.js"]
  end
end
