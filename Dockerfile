FROM node:12.8.1

ENV NODE_ENV=production

# Well-known gid for use in k8s securityContext
# https://github.com/aws/amazon-eks-pod-identity-webhook/issues/8
# https://github.com/kubernetes-sigs/external-dns/pull/1185
# ... but NOT gid=1000: https://github.com/nodejs/docker-node/issues/289
RUN groupadd --gid 1001 etherpad && \
    useradd --uid 1001 --gid etherpad -ms /bin/bash etherpad && \
    mkdir -p /opt/etherpad-lite /root/.esper && \
    chown etherpad:etherpad -R /opt/etherpad-lite /root/.esper

WORKDIR /opt/etherpad-lite
COPY --chown=etherpad:etherpad . .

USER etherpad:etherpad
RUN bin/installDeps.sh

# Install Plugins - it seems like we must do this _after_ installDeps
RUN npm install \
  ep_comments_page@0.0.35 \
  ep_disable_format_buttons@0.0.1 \
  ep_page_view@0.5.24 \
  ep_spellcheck@0.0.3 \
  ep_themes_ext@0.0.4

ENTRYPOINT ["bin/preprocess.sh"]
CMD ["node", "node_modules/ep_etherpad-lite/node/server.js"]
