
import React, { useCallback, useEffect, useState } from 'react'
import { Select, Button } from 'antd'
import { Store } from '../store'
import { useNotebooks } from '../hooks/useNotebooks'

const Option = Select.Option

export function EntryDialog({ onClose }: any) {

  let { myNotebooks, notebook, getNotebook, getMyNotebooks } = useNotebooks()

  let onImport = useCallback(async () => {
    let content = notebook.content
    let schedule = await Store.ctx.api.getScheduleJson(content)
    let pipeline = Store.ctx.getPipeline()
    let uuidMap = {} as any // replace muso id with UUID
    let nodes = schedule.scheduleGroupGraph.scheduleGroups.map((g: any) => {
      let uuid = getUUID()
      uuidMap[g.id] = uuid
      return {
        ...g,
        id: uuid,
        title: g.groupInfo.name,
        sql: getSql(g, schedule.flowGraph.nodes),
        // targets: getTargetsPerGroup(g, targets).map(t => ({
        //   ...t,
        //   platform: state.platform,
        // })),
        targets: [],
      }})
    let edges = schedule.scheduleGroupGraph.scheduleEdges.map((e: any) => ({
      source: uuidMap[e.source],
      target: uuidMap[e.target],
    }))
    let jobplan = pipeline.find(n => n.nodeType === 'jobplan') as any
    jobplan.nodes = jobplan.nodes.concat(nodes.map(n => n.id))
    jobplan.edges = jobplan.edges.concat(edges)
    let newPipeline = pipeline.concat(nodes.map(n => createNode(n.id, n.title, n.sql, n.targets)))
    Store.ctx.setPipeline(newPipeline)
    onClose && onClose()
  }, [notebook])

  return (
    <div>
      <Select
        showSearch
        style={{ width: 300 }}
        placeholder="Select a notebook"
        optionFilterProp="children"
        value={notebook?.id}
        onChange={val => getNotebook(val)}
        dropdownMatchSelectWidth={false}
      >
        {
          myNotebooks.filter(n => n.id !== 'default').map(n => {
            return (
              <Option
                key={n.id}
                value={n.id}
              >
                {n.path}{n.title}
              </Option>
            )
          })
        }
      </Select>
      <Button onClick={getMyNotebooks}>Refresh</Button>
      <Button onClick={onImport}>Import</Button>
    </div>
  )
}

function createNode(id: string, title: string, sql: string, targets: any[]) {
  targets =  [
    {
      "db": "arr_src_prod_rubu",
      "table": "slr_shp_from_cntry_desc",
      "platform": "apollo_rno"
    }
  ]
  return {
    id,
    "nodeType": "job",
    "jobType": "sql",
    "refId": null,
    title,
    "properties": {
      title,
      sql,
      targets,
      "config": "spark.master=yarn\nspark.submit.deployMode=cluster\nspark.driver.memory=20g\nspark.executor.cores=4\nspark.executor.memory=12g\nspark.dynamicAllocation.enabled=true\nspark.dynamicAllocation.initialExecutors=50\nspark.dynamicAllocation.minExecutors=1\nspark.sql.shuffle.partitions=1024\nspark.sql.parquet.writeLegacyFormat=true\nspark.scheduler.listenerbus.eventqueue.size=100000\nspark.speculation.multiplier=2\nspark.speculation.quantile=0.7\nspark.task.maxFailures=2\nspark.speculation.interval=5000ms\nspark.speculation=true\nspark.serializer=org.apache.spark.serializer.KryoSerializer\nspark.rdd.compress=true\nspark.ui.view.acls=*\nspark.ui.view.acls.groups=*\nspark.shuffle.service.enabled=true\nspark.memory.fraction=0.7\nspark.memory.storageFraction=0.7\nspark.executor.extraJavaOptions=\"-XX:ParallelGCThreads=3\"\nspark.sql.autoBroadcastJoinThreshold=10485760\nspark.sql.crossJoin.enabled=true\nspark.rpc.numRetries=5\nspark.rpc.askTimeout=300s\nspark.network.timeout=120s\nspark.yarn.executor.memoryOverhead=6g\nspark.driver.maxResultSize=2G\n",
      "platform": "apollo_rno",
    },
    "creUser": "zxiu",
    "updUser": "zxiu",
}
}

function getUUID() {
  return Math.random() + ''
}

function getSql(group: any, nodes: any[]) {
  let sql = group.nodesInfo.map(n => {
    let node = nodes.find(i => i.id === n.nodeId)
    if (!node || !node.sqlStatement) {
      return
    }
    let segments = [
      n.groupLocalEffectedUseDBCommandSQLStatementId,
      ...n.groupLocalEffectedSetCommandSQLStatementIds,
      node.sqlStatement.id,
    ].filter(i => i > -1 /* MUSO-100 */).sort((a, b) => a - b)
    return segments.map(id => nodes.find(i => i.id === id).sqlStatement?.sqlContent || '').join('\n\n')
  }).join('\n\n')
  return sql
}
