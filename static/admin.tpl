<h1>Jira Integration</h1>
<hr />

<form>
    <div class="alert alert-info">
        <p>
            <label for="protocol">Protocol</label>
            <input type="text" data-field="jira:protocol" title="Protocol" class="form-control" placeholder="Ex. https"><br />
            <label for="domain">Domain</label>
            <input type="text" data-field="jira:domain" title="Domain" class="form-control" placeholder="Ex. blah.jira.com"><br />
            <label for="port">Port</label>
            <input type="text" data-field="jira:port" title="Port" class="form-control" placeholder="Ex. 443"><br />
            <label for="username">Username (urlencoded)</label>
            <input type="text" data-field="jira:username" title="Username" class="form-control" placeholder="Ex. blah%40blah.com"><br />
            <label for="password">Password</label>
            <input type="password" data-field="jira:password" title="Password" class="form-control" placeholder=""><br />
        </p>
    </div>
</form>

<button class="btn btn-lg btn-primary" id="save">Save</button>

<script>
    require(['forum/admin/settings'], function(Settings) {
        Settings.prepare();
    });
</script>