<template>
  <ul class="query-box collapsible">
    <li>
      <div class="collapsible-header grey lighten-3" @click="runQuery(false)">
        {{query.title}} {{queryOutput && queryOutput.length ? `(${queryOutput.length})` : ''}}
        <div class="actions">
          <a @click.stop="toggleFavorite" class="orange-text text-accent-4 tooltipped"
             :data-tooltip="(favorite ? 'Remove from' : 'Add to') + ' favorites'"
          >
            <i class="material-icons right">{{favorite ? 'favorite' : 'favorite_border'}}</i>
          </a>
          <a @click.stop="openEditorModal" class="orange-text text-accent-4 tooltipped"
             data-tooltip="Edit query"
          >
            <i class="material-icons right">edit</i>
          </a>
          <a v-if="queryOutput" @click.stop="runQuery(true)" class="orange-text text-accent-4 tooltipped"
             data-tooltip="Refresh results"
          >
            <i class="material-icons right">refresh</i>
          </a>
        </div>
      </div>
      <div class="collapsible-body">
        <div class="progress white" v-if="running">
          <div class="indeterminate grey"></div>
        </div>

        <form class="row" name="query-params-form" v-if="placeholders.length">
          <div class="input-field col s12" v-for="(placeholder, index) in placeholders" :key="index">
            <input type="text" :id="placeholder.id" :data-token="placeholder.token" required>
            <label :for="placeholder.id">{{placeholder.label}}</label>
          </div>
          <div class="col s12">
            <button type="button" class="btn btn-default orange accent-4" @click="runQuery(true)">
              Run
            </button>
          </div>
        </form>

        <div v-if="!running && queryOutput && queryOutput.length">
          <query-output :output="queryOutput"/>
        </div>

        <div class="query-command row black" :class="queryOutput && queryOutput.length ? 'with-shdaow' : ''">
          <code class="col s1 white-text">
            aws<span class="material-icons">chevron_right</span>
          </code>
          <code class="col s11 white-text">
            <span v-for="(token, index) in awsTokens" :key="index">
              <a :href="getAwsTokenDocLink(index)" class="white-text" target="_blank" v-if="index < 2">
                {{token}}
              </a>
              <span v-else>{{token}}</span>
              &nbsp;
            </span>
          </code>
          <code class="col s1 grey-text">
            &nbsp;jq<span class="material-icons">chevron_right</span>
          </code>
          <code class="col s11 grey-text">
            {{query.jq}}
          </code>
        </div>
      </div>

      <!-- query-editor-modal -->
      <div class="modal">
        <div class="modal-content">
          <h4>Query Editor</h4>
          <query-form
            :query="query"
            :serviceId="serviceId"
            @getServiceQueries="getServiceQueries"
            @closeEditorModal="closeEditorModal"
          />
        </div>
      </div>
      <!-- /query-editor-modal -->
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import M from 'materialize-css';
import * as api from '@/services/api';
import QueryForm from '@/components/queries/query-form.vue';
import QueryOutput from '@/components/queries/query-output.vue';

export default defineComponent({
  components: {
    QueryForm,
    QueryOutput,
  },
  data(): any {
    return {
      running: false,
      queryOutput: null,
      favorite: this.query?.favorite,
      awsTokens: this.query?.aws.split(' '),
      placeholders: (this.query?.aws.match(/{{.+?}}/g) || [])
        .map((token: string) => ({
          id: token.toLowerCase().replace(/\s*/g, '-'),
          label: token.replace(/[{}]/g, ''),
          token,
        })),
    };
  },
  emits: ['getServiceQueries'],
  methods: {
    closeEditorModal(): void {
      const modal = M.Modal.getInstance(this.$el.querySelector('.modal'));

      modal.close();
    },
    openEditorModal(): void {
      const modal = M.Modal.getInstance(this.$el.querySelector('.modal'));

      modal.open();
    },
    getAwsTokenDocLink(index: number): string {
      switch (index) {
        case 0:
          return `https://docs.aws.amazon.com/cli/latest/reference/${this.awsTokens[index]}/`;
        case 1:
          return `https://docs.aws.amazon.com/cli/latest/reference/${this.awsTokens[0]}/${this.awsTokens[index]}`;
        default:
          return '#';
      }
    },
    getServiceQueries(): void {
      this.$emit('getServiceQueries');
    },
    async runQuery(refresh: boolean): Promise<void> {
      const opened = this.$el.firstChild.classList.contains('active');
      const hasParams = this.query.aws.indexOf('{{') !== -1;
      const params = [...this.$el.querySelectorAll('form[name="query-params-form"] input[type=text]')]
        .filter((input: HTMLInputElement) => input.value)
        .map((input: HTMLInputElement) => ({
          token: input.dataset.token,
          value: input.value,
        }));

      this.queryOutput = null;

      if ((!opened || refresh) && (!hasParams || params.length)) {
        this.running = true;
        try {
          const queryOutput = await api.getQueryOutput(this.query._id, params);

          this.queryOutput = queryOutput;
          this.running = false;

          if (!Array.isArray(this.queryOutput) || this.queryOutput.length === 0) {
            M.toast({ html: 'No data.' });
          }
        }
        catch (error) {
          M.toast({
            html: 'Failed to run query. Check your profile credentials.',
            classes: 'error',
          });
          this.running = false;
        }
      }
    },
    async toggleFavorite(): Promise<void> {
      try {
        await api.toggleFavorite(this.query._id, !this.favorite);

        this.favorite = !this.favorite;
      }
      catch (error) {
        M.toast({ html: 'Failed to save favorite', classes: 'error' });
      }
    },
  },
  mounted(): void {
    M.Collapsible.init(this.$el, {});
    M.Modal.init(this.$el.querySelector('.modal'), {});
    M.Tooltip.init(this.$el.querySelectorAll('.tooltipped'), {});
  },
  props: {
    query: Object,
    serviceId: String,
  },
  watch: {
    '$store.state.profile'(): void {
      if (this.$el.firstChild.classList.contains('active')) {
        this.runQuery(true);
      }
    },
  },
});
</script>

<style lang="scss">
.query-box {
  .progress {
    margin-bottom: 1rem;
  }

  li.active {
    .collapsible-header {
      font-weight: bold;
    }
  }

  .query-command {
    margin: 0;
    opacity: 0.6;
    transition: opacity 300ms ease-out;

    &:hover {
      opacity: 1;
    }

    &.with-shdaow {
      box-shadow: 0 -5px 10px #999;
    }
  }
}
</style>
