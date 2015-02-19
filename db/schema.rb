# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150213191524) do

  create_table "album_categories", force: :cascade do |t|
    t.string  "name"
    t.boolean "visible",      default: false
    t.integer "albums_count", default: 0
    t.integer "position"
    t.string  "name_lower"
    t.string  "slug"
    t.boolean "slug_set",     default: false
  end

  add_index "album_categories", ["position"], name: "index_album_categories_on_position"

  create_table "album_photos", force: :cascade do |t|
    t.string   "title"
    t.text     "description"
    t.integer  "position"
    t.integer  "photo_id"
    t.integer  "album_id"
    t.datetime "published_at"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.datetime "deleted_at"
  end

  add_index "album_photos", ["deleted_at"], name: "index_album_photos_on_deleted_at"

  create_table "album_views", force: :cascade do |t|
    t.integer  "album_id",        null: false
    t.string   "context"
    t.text     "context_data"
    t.string   "ip_address"
    t.string   "user_agent"
    t.string   "referrer"
    t.string   "browser_name"
    t.string   "browser_version"
    t.boolean  "mobile"
    t.boolean  "tablet"
    t.string   "platform"
    t.boolean  "bot"
    t.boolean  "search_engine"
    t.string   "tracking_id"
    t.datetime "created_at",      null: false
  end

  create_table "albums", force: :cascade do |t|
    t.string   "title"
    t.text     "description"
    t.integer  "user_id"
    t.datetime "published_at"
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
    t.string   "slug"
    t.integer  "photo_count",       default: 0
    t.string   "client"
    t.datetime "deleted_at"
    t.integer  "cover_id"
    t.integer  "views_count",       default: 0
    t.integer  "album_category_id"
  end

  add_index "albums", ["album_category_id"], name: "index_albums_on_album_category_id"
  add_index "albums", ["cover_id"], name: "index_albums_on_cover_id"
  add_index "albums", ["deleted_at"], name: "index_albums_on_deleted_at"

  create_table "config", force: :cascade do |t|
    t.string "site_title"
    t.string "blog_title", default: "Blog"
  end

  create_table "photo_views", force: :cascade do |t|
    t.integer  "photo_id",        null: false
    t.integer  "album_id"
    t.string   "context"
    t.text     "context_data"
    t.string   "ip_address"
    t.string   "user_agent"
    t.string   "referrer"
    t.string   "browser_name"
    t.string   "browser_version"
    t.boolean  "mobile"
    t.boolean  "tablet"
    t.string   "platform"
    t.boolean  "bot"
    t.boolean  "search_engine"
    t.string   "tracking_id"
    t.datetime "created_at",      null: false
  end

# Could not dump table "photos" because of following NoMethodError
#   undefined method `[]' for nil:NilClass

  create_table "posts", force: :cascade do |t|
    t.string   "title"
    t.text     "raw_content"
    t.text     "html_content"
    t.string   "slug"
    t.integer  "user_id"
    t.datetime "published_at"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: ""
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "invitation_token"
    t.datetime "invitation_created_at"
    t.datetime "invitation_sent_at"
    t.datetime "invitation_accepted_at"
    t.integer  "invitation_limit"
    t.integer  "invited_by_id"
    t.string   "invited_by_type"
    t.integer  "invitations_count",      default: 0
    t.string   "username"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true
  add_index "users", ["invitation_token"], name: "index_users_on_invitation_token", unique: true
  add_index "users", ["invitations_count"], name: "index_users_on_invitations_count"
  add_index "users", ["invited_by_id"], name: "index_users_on_invited_by_id"
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  add_index "users", ["username"], name: "index_users_on_username", unique: true

end
