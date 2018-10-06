'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const Mixed = Schema.Types.Mixed;
    const conn = app.mongooseDB.get('db3');

    const WebResourceSchema = new Schema({
        system_domain: { type: String }, // 系统 域名
        system_name: { type: String }, // 系统名称
        app_id: { type: String }, // 系统appId标识
        user_id: { type: Mixed }, // 应用所属用户ID
        create_time: { type: Date, default: Date.now }, // 用户访问时间
        script: { type: String }, // 获取页面统计脚本
        is_use: { type: Number, default: 0 }, // 是否需要统计  0：是  1：否
        slow_page_time: { type: Number, default: 5 }, // 页面加载页面阀值  单位：s
        slow_js_time: { type: Number, default: 2 }, // js慢资源阀值 单位：s
        slow_css_time: { type: Number, default: 2 }, // 慢加载css资源阀值  单位：S
        slow_img_time: { type: Number, default: 2 }, // 慢图片加载资源阀值  单位:S
        slow_ajax_time: { type: Number, default: 2 }, // AJAX加载阀值
        is_statisi_pages: { type: Number, default: 0 }, // 是否统计页面性能信息  0：是   1：否
        is_statisi_ajax: { type: Number, default: 0 }, // 是否统计页面Ajax性能资源 0：是  1：否
        is_statisi_resource: { type: Number, default: 0 }, // 是否统计页面加载资源性能信息 0：是    1：否
        is_statisi_system: { type: Number, default: 0 }, // 是否存储用户系统信息资源信息 0：是   1：否
        is_statisi_error: { type: Number, default: 0 }, // 是否上报页面错误信息  0：是   1：否
    });

    WebResourceSchema.index({ app_id: -1, create_time: 1, mark_page: -1, mark_user: -1, url: -1 });

    return conn.model('WebSystem', WebResourceSchema);
};